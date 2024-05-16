import ReactECharts from 'echarts-for-react'
import PropTypes from 'prop-types';


const TreeMap = ({ data }) => {
    const getOption = () => {
        const setColor = (change) => {
            if (change > 0) {
                return '#8DA750'
            } else if (change < 0) {
                return '#FF4747'
            } else {
                return '#808080'
            }
        }

        const formatData = (data) => {
            // eslint-disable-next-line react/prop-types
            return data.map((item) => ({
                ...item,
                itemStyle: {
                    color: setColor(item.change)
                },
                children: item.children ? formatData(item.children) : []
            }))
        }

        return {
            title: {
                text: 'NIFTY Index TreeMap',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}'
            },
            series: [
                {
                    name: 'NIFTY Index',
                    type: 'treemap',
                    visibleMin: 300,
                    label: {
                        show: true,
                        formatter: '{b}'
                    },
                    upperLabel: {
                        show: true,
                        height: 30,
                        color: '#fff'
                    },
                    itemStyle: {
                        borderColor: '#fff'
                    },
                    levels: [
                        {
                            itemStyle: {
                                borderColor: '#777',
                                borderWidth: 0,
                                gapWidth: 1
                            },
                            upperLabel: {
                                show: false
                            }
                        },
                        {
                            itemStyle: {
                                borderColor: '#555',
                                borderWidth: 5,
                                gapWidth: 1
                            }
                        },
                        {
                            colorSaturation: [0.35, 0.5],
                            itemStyle: {
                                borderWidth: 5,
                                gapWidth: 1,
                                borderColorSaturation: 0.6
                            }
                        }
                    ],
                    data: formatData(data.children)
                }
            ]
        }
    }

    return (
        <ReactECharts
            option={getOption()}
            style={{ height: window.innerHeight - 50, width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
            theme={'theme_name'}
        />
    )
}

TreeMap.propTypes = {
    data: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                change: PropTypes.number,
            })
        ).isRequired, // Ensure that children is marked as required
    }).isRequired,
};

export default TreeMap
