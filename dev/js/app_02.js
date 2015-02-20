/**
 * 加速度センサーのデータを取得し、
 * ローパスフィルタにかけてノイズを軽減させて
 * グラフオブジェクトに渡す→古いデータを消す→アップデートする。
 */
jQuery(function($){
    var
    acclChart = window.acclChart,
    display = { x : $('#x'), y : $('#y'), z : $('#z') },

    effector = function(){
        this.prev = 0;
    },

    effectorX = new effector(),
    effectorY = new effector(),
    effectorZ = new effector();

    effector.prototype.lpf = function(data){
        var output = (this.prev * 0.92) + (data * 0.08);

        this.prev = output;
        return output;
    };


    /**
     * 加速度センサーのイベントハンドラ
     * 乱暴だけれどイベント毎に画面描画をかけてみた。
     * 負荷、電池消耗を考えるとここはデータの間引きなどの工夫が必要かもしれない。
     */
    $(window).on('devicemotion',function(e){

        var
        /**
         * 重力加速度イベントへの参照。
         * jQueryのEventから取る場合、originalEventを経由する。
         * 素のJavascriptでの実装ならばそのまま参照できる。
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