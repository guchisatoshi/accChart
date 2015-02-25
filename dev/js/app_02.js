/**
 * 加速度センサーのデータを取得し、
 * ローパスフィルタにかけてノイズを軽減させて
 * グラフオブジェクトに渡す→古いデータを消す→アップデートする。
 */
jQuery(function($){
    var
    acclChart = window.acclChart,
    display = { x : $('#x'), y : $('#y'), z : $('#z') },

    /**
     * ローパスフィルタを実装するための関数。
     * 前回の値を使用するのでそれを保持する変数をプロパティに持つ。
     */
    effector = function(){
        this.prev = 0;
    },

    /**
     * X Y Zの三軸それぞれにeffector()関数をnewする。
     */
    effectorX = new effector(),
    effectorY = new effector(),
    effectorZ = new effector();

    /**
     * ローパスフィルタ。
     * ローパスフィルタの実装には過去数回分のデータから平均を持ってくるアプローチや、
     * 前回分と今回分を割合でブレンドする方法、またその両方をミックスさせる方法がある。
     * ロジックが分かりやすい、前回と今回のブレンドで実装した。
     * 要するに直前の回のデータをほとんどそのまま、今回のデータをちょっと加えることで、
     * 急激なデータの変化（ノイズ）を抑えようというわけだ。
     * 今回分のデータを取り入れる割合を減らすほどノイズが減り、
     * 激しい動きでもグラフが乱れなくなる。
     * 反面、動きを止めて、ある加速度が0になったとしても、
     * グラフが0に落ち着くまである程度の時間がかかる。
     * この割合はどれくらい激しい動きがあるか、ノイズをどの程度のレベルで抑えるか等を
     * 考慮して調整していく。
     */
    effector.prototype.lpf = function(data){
        var output = (this.prev * 0.92) + (data * 0.08);

        this.prev = output;
        return output;
    };


    /**
     * 加速度センサーのイベントハンドラ
     */
    $(window).on('devicemotion',function(e){

        var
        /**
         * 重力加速度イベントへの参照。
         */
        acclData = e.originalEvent.accelerationIncludingGravity,

        /**
         * 各軸のデータをローパスフィルタにかける。
         */
        x = effectorX.lpf(acclData.x),
        y = effectorY.lpf(acclData.y),
        z = effectorZ.lpf(acclData.z);

        /**
         * グラフの他、実データを表示。
         */
        display.x.text(x);
        display.y.text(y);
        display.z.text(z);

       /**
        * Chart.jsのメソッドでデータを追加する。
        */
       acclChart.addData([x,y,z],'');

       /**
        * 古いデータを削除する。
        */
       if(acclChart.datasets[0].points.length > 15){
           acclChart.removeData();
       }

       /**
        * グラフのアップデート。
        */
       acclChart.update();

    });
});