requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $, rr) {

        function changeDirection(dataInput) {

            const colorDark = "#294270";
            const colorOrange = "#FABA00";
            const colorBlue = "#8FC7ED";

            const cellSize = 20;
            const indent = 10;

            const attrRect = { "stroke": colorDark, "stroke-width": 1, "fill": colorBlue };

            maxHeight = Math.max(...dataInput);
            m = Math.min(...dataInput);
            cutHeight = m - ((m == 0) ? 0: 1);

            const sizeX = dataInput.length * cellSize + indent * 2;
            const sizeY = (maxHeight - cutHeight) * cellSize + indent * 4;
            // solution (indexes of direction change)
            var dir = 0;
            var dots = [];
            for (var i = 0; i < dataInput.length - 1; i++) { 
                var dir2 = dataInput[i + 1] - dataInput[i];
                if (dir2) {
                    if (dir2 * dir < 0) { dots.push(i) }
                    dir = dir2
                }
            }
            dots.splice(0, 0, 0);
            dots.push(dataInput.length - 1);

            this.draw = function (dom) {
                paper = Raphael(dom, sizeX, sizeY);
                // drawing trend lines and circles
                for (var j = 0; j < dots.length - 1; j++) {
                    const s = dots[j];
                    const e = dots[j + 1];
                    const x = cellSize * s + cellSize / 2 + indent;
                    if (dataInput[e] > dataInput[s]) {
                        paper
                            .path(`m${x},${indent * 3}l${(e - s) * cellSize},${-2 * indent}`)
                            .attr({ "stroke": colorDark });
                        if (s) {
                            paper
                                .circle(x, indent * 3, 2)
                                .attr({ "stroke": colorOrange, "fill": colorOrange })
                        }
                    } else if (dataInput[e] < dataInput[s]) { 
                        paper
                            .path(`m${x},${indent}l${(e - s) * cellSize},${2 * indent}`)
                            .attr({ "stroke": colorDark });
                        if (s) {
                            paper
                                .circle(x, indent, 2)
                                .attr({ "stroke": colorOrange, "fill": colorOrange })
                        }
                    }
                }
                // drawing columns with number heights
                for (var i = 0; i < dataInput.length; i++) {
                    paper
                        .rect(cellSize * i + indent, (maxHeight - dataInput[i]) * cellSize + indent * 4, cellSize, (dataInput[i] - cutHeight) * cellSize)
                        .attr(attrRect);
                    paper
                        .text(cellSize * i + indent + cellSize / 2, (maxHeight - dataInput[i]) * cellSize + cellSize/2 + indent * 4, dataInput[i])
                        .attr({ "stroke": colorDark })
                }
            }
        };
        new extIO({
            animation: function ($expl, data) {
                new changeDirection(data.in[0]).draw($expl[0])
            }
        }).start()
    }
);
