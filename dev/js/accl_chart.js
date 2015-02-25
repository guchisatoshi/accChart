/**
 * Chart.jsを使って線グラフを表示する。
 * グラフオブジェクトの生成とwindowオブジェクトへのプロパティ追加。
 * もう少しjQueryを使ってなにかするかと思ったけど結局ほとんど使わなかった。
 */
jQuery(function($){
    var

    /**
     * canvas要素の取得等。
     * Chart.jsのオプションでレスポンシブにできるけれど、とりあえず読み込み時の
     * body要素の幅を取ってくる形にする。
     */
    bodyWidth = $('body').width(),
    canvas = $('#accl_chart').attr({'width':bodyWidth,'height':300}),
    ctx = canvas[0].getContext('2d'),

    /**
     * Chart.jsの初期化
     */
    acclChart = new Chart(ctx).Line(
        /**
         * データセットの設定。実データは後で投げ込んでいくので、
         * 初期化時は空配列。ラインの色だけを指定する。
         * 後に加速度データを入れる際、X/Y/Zの三軸になるので、
         * セット数も3個。
         */
        {
            labels: [],
            datasets: [
                { strokeColor: '#ff0066', data: [] },
                { strokeColor: '#33ff00', data: [] },
                { strokeColor: '#0033ff', data: [] }
            ]
        },
        {
            /**
             * Chart.jsのオプション指定(Global)
             */
            animation : false,//初期化時のアニメーション
            scaleLineColor : '#555',//グラフ外側のラインの色
            scaleFontColor : '#666',//グラフ外側の文字色
            showTooltips : false,//マウスオーバー時のToolTip
            scaleFontSize : 10,

            scaleOverride : true,//グラフの数値を固定表示する
            scaleSteps : 8,//目盛り数
            scaleStepWidth : 5,//目盛りの間隔
            scaleStartValue : -20,//最小値(グラフの一番下の値)


            /**
             * Chart.jsのオプション指定(Line Chart)
             * なめらかに線を表現するベジェカーブが使えるけれど、
             * データのノイズ除去も行っていくため、オフに。
             */
            bezierCurve : false,//ベジェカーブさせるか
            pointDot : false,//プロットマークの表示
            datasetFill : false,//塗り
            datasetStrokeWidth : 2,
            scaleGridLineColor : '#444'
        }
    );

    /**
     * 別のスクリプトからグラフオブジェクトを操作するため
     * windowオブジェクトにプロパティを追加する。
     */
    window.acclChart = acclChart;
});