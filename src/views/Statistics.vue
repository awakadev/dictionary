<template>
    <div class="statistics">
        <h1>This is a statistics page</h1>
        <v-chart
                ref="chart"
                auto-resize
                :options="option"></v-chart>
    </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/calendar'
import 'echarts/lib/component/tooltip'
import { mapGetters } from 'vuex'

export default {
  components: {
    'v-chart': ECharts
  },

  data: function () {
    return {}
  },

  computed: {
    ...mapGetters([
      'words',
      'groupedWords',
      'countGroupedWords',
      'maxCountGroupedWords'
    ]),
    chartData () {
      return this.countGroupedWords.map(word => {
        let names = this.groupedWords[word[0]].map(item => { return item.english })
        return {
          name: names.join('<br/>'),
          value: word
        }
      })
    },
    option () {
      return {
        tooltip: {
          formatter: function (params) {
            return [
              params.value[0] + '<hr size=1 style="margin: 3px 0" class="tooltip-hr">',
              params.data.name
            ].join('')
          }
        },
        visualMap: {
          min: 0,
          max: this.maxCountGroupedWords,
          orient: 'horizontal',
          left: 'center',
          top: 65,
          textStyle: {
            color: '#2c3e50'
          },
          inRange: {
            color: ['#fff', '#42b983']
          }
        },
        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: '2018',
          itemStyle: {
            normal: { borderWidth: 0.5 }
          },
          yearLabel: { show: false }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: this.chartData || []
        }
      }
    }
  },

  created () {
    if (this.words.length === 0) {
      this.$store.dispatch('getWords')
    }
  },

  watch: {
    chartData: function (val, oldVal) {
      this.$refs.chart.mergeOptions({
        visualMap: {
          min: 0,
          max: this.maxCountGroupedWords
        },
        series: [{ data: val }]
      })
    }
  }
}
</script>
