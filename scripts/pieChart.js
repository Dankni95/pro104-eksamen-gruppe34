google.charts.load('current', {'packages' :['corechart']});
google.charts.setOnLoadCallback(drawChart);
    
function drawChart(){

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Completed'],
        ['nr1', 11],
        ['nr2', 8],
        ['nr3', 5]

    
    ]);

    var options = {
        title: 'Task Overview',
        backgroundColor: "none",
        chartArea: {left: "40"},
       

    };

    var chart = new google.visualization.PieChart(document.getElementById("piechart"));
    
    
    chart.draw(data, options);
}

function drawMiniChart(){
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Completed'],
        ['nr1', 11],
      
    ]);

    var options = {
        title: 'Task Overview',
        backgroundColor: "none",
        chartArea: {left: "40"},
       

    };

    var chart = new google.visualization.PieChart(document.getElementById("miniChart1"));
    
    
    chart.draw(data, options);

}