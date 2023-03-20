requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $, rr) {

        function changeDirection(dataInput, dataDescr) {

            const dots = dataDescr;
            dots.splice(0, 0, 0);
            dots.push(dataInput.length - 1);

            const colorDark = "#294270";
            const colorOrange = "#FABA00";
            const colorBlue = "#8FC7ED";

            const cellSize = 20;
            const indent = 10;

            const attrRect = { "stroke": colorDark, "stroke-width": 1, "fill": colorBlue };

            maxHeight = Math.max(...dataInput);

            const sizeX = dataInput.length * cellSize + indent * 2;
            const sizeY = maxHeight * cellSize + indent * 4;

            this.draw = function (dom) {
                paper = Raphael(dom, sizeX, sizeY);
                // drawing trend lines and circles
                for (var i = 0; i < dots.length - 2; i++) {
                    const s = dots[i];
                    const e = dots[i + 1];
                    const x = cellSize * s + cellSize / 2 + indent;
                    if (dataInput[e] > dataInput[s]) {
                        paper
                            .path(`m${x},${indent * 3}l${(e - s) * cellSize},${-2 * indent}`).attr({ "stroke": colorDark });
                        if (s != 0) { paper.circle(x, indent * 3, 2).attr({"stroke": colorOrange, "fill": colorOrange}) }
                    } else { 
                        paper
                            .path(`m${x},${indent}l${(e - s) * cellSize},${2 * indent}`).attr({ "stroke": colorDark });
                        if (s != 0) { paper.circle(x, indent, 2).attr({"stroke": colorOrange, "fill": colorOrange}) }
                    }
                }
                // drawing columns with number heights
                for (var i = 0; i < dataInput.length; i++) {
                    paper
                        .rect(cellSize * i + indent, (maxHeight - dataInput[i]) * cellSize + indent * 4, cellSize, dataInput[i] * cellSize)
                        .attr(attrRect);
                    paper
                        .text(cellSize * i + indent + cellSize / 2, (maxHeight - dataInput[i]) * cellSize + cellSize/2 + indent * 4, dataInput[i])
                        .attr({ "stroke": colorDark })
                }
            }
        };
        new extIO({
            animation: function ($expl, data) {
                new changeDirection(data.in[0], data.ext.description).draw($expl[0])
            }
        }).start()
    }
);