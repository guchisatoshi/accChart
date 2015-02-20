/**
 * 定期的にランダムなデータを生成し、
 * グラフオブジェクトに渡す→古いデータを消す→アップデートする。
 */
jQuery(function($){
    var
    acclChart = window.acclChart;

    setInterval(function(){

        var
        /**
         * 追加するデータをランダムで生成する。
         * 実際に加速度を取ってくるまでのつなぎなので、適当に。
         */
        x = Math.floor(Math.random() * 20),
        y = Math.floor(Math.random() * 20),
        z = Math.floor(Math.random() * 20);

        /**
         * Chart.jsのメソッドでデータを追加する。
         * グラフを初期化して以降、データを追加するにはこのメソッドを使うのがベスト。
         * データセットの末尾に追加される。
         * データの渡し方が配列になるのが少し不安だけれど、
         * 初期化時に各データセットに名前を付けられそうなので、明示的に追加もできるかも。
         */
        acclChart.addData([x,y,z],'');

        /**
         * プロットされる間隔を一定にするために、
         * プロット数の上限を決めてデータを削除してやる。
         * これもChart.jsのメソッドを使う。
         */
        if(acclChart.datasets[0].points.length > 15){
            acclChart.removeData();
        }

        /**
         * グラフのアップデート。
         */
        acclChart.update();
    },180);

});