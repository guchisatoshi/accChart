/**
 * 加速度センサーのデータを取得し、
 * グラフオブジェクトに渡す→古いデータを消す→アップデートする。
 */
jQuery(function($){
    var
    acclChart = window.acclChart,
    display = { x : $('#x'), y : $('#y'), z : $('#z') };

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

        x = acclData.x,
        y = acclData.y,
        z = acclData.z;

        /**
         * グラフの他、実データを表示してみる。
         * 間隔が短すぎて、ほとんど判読できないけれど。
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