<script lang='ts'>
  import Stocks from "./Stocks.svelte"
  import { Chart } from "chart.js/auto";

  // variables for ben to use for the graphs
  let var1;
  let var2;
  let var3;

  let events: string;
  let news: string;

  function draw() {
    const data = [
        {year: 2010, count: 10},
        {year: 2011, count: 29},
        {year: 2012, count: 15},
        {year: 2013, count: 22},
        {year: 2014, count: 30},
    ];

    new Chart(
      document.getElementById('graph'),
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [ 
            {
              label: 'year',
              data: data.map(row => row.count)
            }
          ]
        }
      }
    );
  }
</script>

<section class="card tw:border-[#111211] tw:p-6 flex flex-col">
  <section class="card tw:border-[#111211] tw:p-6">
    <div class="container" id="events"></div>
    <div><canvas class="container" id="graph" width="600" height="400" ></div>
    <div class="container" id="news"></div>
   </section> 
   <section class="card tw:border-[#111211] tw:p-6" id="stocks">
      <Stocks></Stocks>
   </section> 
</section>
