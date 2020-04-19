var yourVlSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined.csv"},
    "transform":[
    {"filter": "datum.category != 'Earnings'"},
    {"filter": "datum.category != 'Earning'"},
    {"filter": "datum.account_number == '7157'"}
  ],
  
  "vconcat": [
    {
      "selection": {
        "brush": {
          "encodings": ["x"],
          "type": "interval"}
      },
  
      "mark": "point",
      "width": 990,
      "height": 545,
  
      "encoding": {
        "x": {
          "axis": {"title": "Date", "format": "%b"},
          "field": "transaction_date",
          "timeUnit": "monthdate",
          "type": "temporal"},
  
        "y": {
          "axis": {"title": "Amount ($)"},
          "field": "transaction_amount",
          "type": "quantitative"},
  
        "color": {
          "condition": {
            "field": "account_number",
            "type": "nominal",
            "selection": "brush"
          },
          "value": "lightgray"
        }
      }
    },
  
    {
      "selection": {
        "highlight": {
          "type": "single",
          "empty": "none",
          "on": "mouseover"
        },
        "select": {"type": "multi"}
      },
  
      "transform": [{"filter": {"selection": "brush"}}],
  
      "width": {"step": 100},
      "width": 990,
      "mark": {
        "type": "bar",
        "cursor": "pointer",
        "stroke": "black"
      },
  
      "encoding": {
        "y": {
          "field": "category",
          "type": "nominal",
          "axis": {"title": "Categories"}
        },
        "x": {
          "axis": {"title": "Amount ($)", "grid": true},
          "aggregate": "sum",
          "field": "transaction_amount",
          "type": "quantitative"
        },
  
        "fillOpacity": {
          "condition": {"selection": "select", "value": 1},
          "value": 0.3
        },
  
        "strokeWidth": {
          "condition": [
            {"test": {"and": [{"selection": "select"},"length(data(\"select_store\"))"]},"value": 2},
            {"selection": "highlight", "value": 1}
          ],
          "value": 0
        },
        "color": {
          "title": "Account",
          "field": "account_number",
          "type": "nominal"
        },
       
        "tooltip": {
          "aggregate": "sum",
          "field": "transaction_amount",
          "type": "quantitative"}
        },
  
        "config": {
          "view": {"stroke": "transparent"},
          "axis": {"domainWidth": 1}
        }
    }
  ]
 } 

vegaEmbed('#vis', yourVlSpec);