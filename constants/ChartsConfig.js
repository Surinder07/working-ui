export const pieConfig = (title, subTitle) => {
    return {
        elements: {
            arc: {
                weight: 0.5,
                borderWidth: 3
            }
        },
        responsive: true,
        aspectRatio: 1,
        plugins: {
            title: generateTitleConfig(title),
            subtitle: generateSubTitleConfig(subTitle),
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    boxWidth: 15,
                    font: {
                        family: 'Mulish',
                        weight: 600
                    },
                    usePointStyle: true
                }
            }
        }
    }
}

export const areaConfig = (title, subTitle, xTitle, yTitle) => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: generateTitleConfig(title),
            subtitle: generateSubTitleConfig(subTitle),
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    boxWidth: 15,
                    font: {
                        family: 'Mulish',
                        weight: 600
                    },
                    usePointStyle: true
                }
            }
        },
        scales: {
            x: {
                title: {
                    text: 'Month',
                    display: true,
                    font: {
                        family: 'Mulish'
                    },
                    color: '#252733',
                },
                grid: {
                    display: false,
                    drawTicks: false
                },
                border: {
                    display: false
                },
                beginAtZero: true
            },
            y: {
                title: {
                    text: 'Invoices Amount',
                    display: true,
                    font: {
                        family: 'Mulish'
                    },
                    color: '#252733'
                },
                grid: {
                    drawTicks: false
                },
                border: {
                    display: false
                },
                beginAtZero: true,
                ticks: {
                    maxTicksLimit: 6
                }
            }
        },
        elements: {
            line: {
                borderWidth: 2,
            },
            point: {
                radius: 0.1
            }
        }
    }
}

const generateTitleConfig = (title) => {
    return {
        display: true,
        text: title,
        align: 'start',
        position: 'top',
        color: '#252733',
        font: {
            family: 'Mulish',
            weight: 800,
            size: 20
        }
    }
}

const generateSubTitleConfig = (subTitle) => {
    return {
        display: true,
        text: subTitle,
        align: 'start',
        position: 'top',
        color: '#252733',
        padding: {
            bottom: 15
        },
        font: {
            family: 'Mulish'
        }
    }
}