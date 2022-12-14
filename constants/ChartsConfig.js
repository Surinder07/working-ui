export const pieConfig = (title, subTitle) => {
    return {
        elements: {
            arc: {
                weight: 0.5,
                borderWidth: 3
            }
        },
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
              display: true,
              title: {
                display: true,
                text: xTitle
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: yTitle
              }
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