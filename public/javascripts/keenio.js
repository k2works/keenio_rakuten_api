Keen.onChartsReady(function() {
  var metric = new Keen.Metric("item_rank", {
    analysisType: "median",
    timeframe: "this_7_days",
    targetProperty: "rank",
    filters: [{"property_name":"code","operator":"ne","property_value":"healthy-company:10000108"}]
  });
  metric.draw(document.getElementById("myMedianRankDiv"),{
    label: "中央値"
  });
});

Keen.onChartsReady(function() {
  var metric = new Keen.Metric("item_rank", {
    analysisType: "average",
    timeframe: "this_7_days",
    targetProperty: "rank",
    filters: [{"property_name":"code","operator":"ne","property_value":"healthy-company:10000108"}]
  });
  metric.draw(document.getElementById("myAvarageRankDiv"),{
    label: "平均値"
  });
});

Keen.onChartsReady(function() {
  var metric = new Keen.Metric("item_rank", {
    analysisType: "minimum",
    timeframe: "this_7_days",
    targetProperty: "rank",
    filters: [{"property_name":"code","operator":"ne","property_value":"healthy-company:10000108"}]
  });
  metric.draw(document.getElementById("myMinRankDiv"),{
    label: "最高順位"
  });
});

Keen.onChartsReady(function() {
  var metric = new Keen.Metric("item_rank", {
    analysisType: "maximum",
    timeframe: "this_7_days",
    targetProperty: "rank",
    filters: [{"property_name":"code","operator":"ne","property_value":"healthy-company:10000108"}]
  });
  metric.draw(document.getElementById("myMaxRankDiv"),{
    label: "最低順位"
  });
});

Keen.onChartsReady(function() {
  var series = new Keen.Series("item_rank", {
    analysisType: "average",
    timeframe: "this_7_days",
    interval: "daily",
    targetProperty: "rank",
    groupBy: "name",
    filters: [{"property_name":"code","operator":"ne","property_value":"healthy-company:10000108"}]
  });
  series.draw(document.getElementById("myTotalRankLineDiv"), { lineWidth: 2 });
});

Keen.onChartsReady(function() {
  var metric = new Keen.Metric("item_rank", {
    analysisType: "count",
    timeframe: "this_7_days",
    groupBy: "keyword",
    filters: [{"property_name":"code","operator":"ne","property_value":"healthy-company:10000108"}]
  });
  metric.draw(document.getElementById("myTotalGroupDiv"));
});
