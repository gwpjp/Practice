/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//A vector type
function Vector(x,y) {
	this.x = x;
	this.y = y;
	this.plus = function(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	};
	this.minus = function(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	};

	Object.defineProperty(this, "length", {
		get: function() {return Math.sqrt(this.x*this.x+this.y*this.y);},
	});
};

//Another cell
function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  return rows.map(drawRow).join("\n");
}

function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

function TextCell(text) {
  this.text = text.split("\n");
}

TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};

TextCell.prototype.minHeight = function() {
  return this.text.length;
};

TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

function UnderlinedCell(inner) {
  this.inner = inner;
}

UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};

UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};

UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
};

function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      var value = row[name];
      // This was changed:
      if (typeof value == "number")
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    });
  });
  return [headers].concat(body);
}

function RTextCell(text) {
  TextCell.call(this, text);
}

RTextCell.prototype = Object.create(TextCell.prototype);

RTextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  }
  return result;
};

function StretchCell(inner, width, height) {
	this.inner = inner;
	this.width = width;
	this.height = height;
}

StretchCell.prototype = Object.create(TextCell.prototype);

StretchCell.prototype.minHeight = function () {
	return Math.max(this.height,this.inner.minHeight());
};

StretchCell.prototype.minWidth = function () {
	return Math.max(this.width,this.inner.minWidth());
};

StretchCell.prototype.draw = function (width, height) {
	return this.inner.draw(width,height);
};

//Sequence Interface

var logFive = function(sequence) {
	for (let i = 0; i < 5; i++) {
		if (!sequence.next()){
			break;
		}
		else {
			console.log(sequence.current());
		}
	}
};

function ArraySeq(array) {
	this.array = array;
}

ArraySeq.prototype.next = function() {
	return this.array.length > 0;
};

ArraySeq.prototype.current = function() {
	return this.array.shift();
};

function RangeSeq(from,to) {
	this.array = Array.apply(0,Array(to-from+1)).map((x,y) => y+from);
}

RangeSeq.prototype = Object.create(ArraySeq.prototype);





