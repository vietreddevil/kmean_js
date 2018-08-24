var nums = [];
for(var i = 0; i < 1500; i++) {
	var num = ['', ''];
	num[0] = Math.floor(Math.random()*100 + 1);
	num[1] = Math.floor(Math.random()*100 + 1);
	nums.push(num);
}

var i0 = 0;
var i1 = 1;
var i2 = 2;
lable0 = [];
lable1 = [];
lable2 = [];


function dis(val0, val1) {
	return Math.sqrt(Math.pow(val0[0] - val1[0], 2) + Math.pow(val0[1] - val1[1], 2));
}

function set_lable(val0, val1, val2, val) {//gan nhan
	var dis0 = dis(val, val0);
	var dis1 = dis(val, val1);
	var dis2 = dis(val, val2);

	var min = (dis0 < dis1) ? ((dis0 < dis2) ? dis0 : dis2) : ((dis1 < dis2) ? dis1 : dis2);
	if(min === dis0) {
		val[2] = 'x0';
	}else if(min === dis1){
		val[2] = 'x1';
	}else {
		val[2] = 'x2';
	}
}


var contains = function(needle) {//xac dinh xem mot mang co chua gia tri truyen vao khong
    var findNaN = needle !== needle;
    var indexOf;
    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            for(i = 0; i < this.length; i++) {
                var item = this[i];
                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle) > -1;
}

function center(val) {//tim trung bnh cong cua cac diem
	var center_point = [];
	var tongX = 0;
	var tongY = 0;
	for(var i = 0; i < val.length; i++) {
		tongX += val[i][0];
		tongY += val[i][1];
	}
	center_point[0] = tongX / (val.length);
	center_point[1] = tongY / (val.length);
	return center_point;
}

var x0 = nums[i0];
x0[2] = 'x0';
var x1 = nums[i1];
x1[2] = 'x1';
var x2 = nums[i2];
x2[2] = 'x2';
var prev0;
var prev1;
var prev2;
while(1) {	
	prev0 = x0;
	prev1 = x1;
	prev2 = x2;
	//luu gia tri cua cac centers cu de so sanh voi centers moi 
	
	console.log("old centers:")
	console.log(x0);
	console.log(x1);
	console.log(x2);
	// tao cac mang temp de luu cac diem co cung lable
	var l0 = [];
	var l1 = [];
	var l2 = [];
	for(var i = 0; i < nums.length; i ++) {
		set_lable(x0, x1, x2, nums[i]);
		if(contains.call(nums[i], 'x0')) {
			l0.push(nums[i]);
		}else if(contains.call(nums[i], 'x1')) {
			l1.push(nums[i]);
		}else {
			l2.push(nums[i]);
		}
	}
	console.log("dis: ")
	x0 = center(l0);console.log(dis(prev0, x0));
	x1 = center(l1);console.log(dis(prev1, x1));
	x2 = center(l2);console.log(dis(prev2, x2));

	lable0 = l0;
	lable1 = l1;
	lable2 = l2;
	if(dis(prev0, x0) === 0 && dis(prev1, x1) === 0 && dis(prev2, x2) === 0) {
		break;
	}
	console.log("new centers: ");
	console.log(x0);
	console.log(x1);console.log(x2);
}
console.log("lable 0: " + lable0.length);
console.log("lable 1: " + lable1.length);
console.log("lable 2: " + lable2.length);

//vẽ các phân bố ra màn hình
for(var i = 0; i <lable0.length; i++) {
	var para = document.createElement("span");
	var node = document.createTextNode(".");
	para.appendChild(node);
	para.style.position = "fixed";
	para.style.marginTop = parseInt(lable0[i][0]) + 'px';
	para.style.marginLeft = parseInt(lable0[i][1]) + 'px';
	para.setAttribute('class', 'l0');
	var div = document.getElementById("cc");
	div.appendChild(para);
}

for(var i = 0; i <lable1.length; i++) {
	var para = document.createElement("span");
	var node = document.createTextNode(".");
	para.appendChild(node);
	para.style.position = "fixed";
	para.style.marginTop = parseInt(lable1[i][0]) + 'px';
	para.style.marginLeft = parseInt(lable1[i][1]) + 'px';
	para.setAttribute('class', 'l1');
	var div = document.getElementById("cc");
	div.appendChild(para);
}

for(var i = 0; i <lable2.length; i++) {
	var para = document.createElement("span");
	var node = document.createTextNode(".");
	para.appendChild(node);
	para.style.position = "fixed";
	para.style.marginTop = parseInt(lable2[i][0]) + 'px';
	para.style.marginLeft = parseInt(lable2[i][1]) + 'px';
	para.setAttribute('class', 'l2');
	var div = document.getElementById("cc");
	div.appendChild(para);
}
	//vẽ 3 tâm
	var para0 = document.createElement("span");
	var node0 = document.createTextNode(".");
	para0.appendChild(node0);
	para0.style.position = "fixed";
	para0.style.marginTop = parseInt(x0[0]) + 'px';
	para0.style.marginLeft = parseInt(x0[1]) + 'px';
	para0.setAttribute('class', 'c');
	var div = document.getElementById("cc");
	div.appendChild(para0);

	var para2 = document.createElement("span");
	var node2 = document.createTextNode(".");
	para2.appendChild(node2);
	para2.style.position = "fixed";
	para2.style.marginTop = parseInt(x2[0]) + 'px';
	para2.style.marginLeft = parseInt(x2[1]) + 'px';
	para2.setAttribute('class', 'c');
	var div = document.getElementById("cc");
	div.appendChild(para2);

	var para1 = document.createElement("span");
	var node1 = document.createTextNode(".");
	para1.appendChild(node1);
	para1.style.position = "fixed";
	para1.style.marginTop = parseInt(x1[0]) + 'px';
	para1.style.marginLeft = parseInt(x1[1]) + 'px';
	para1.setAttribute('class', 'c');
	var div = document.getElementById("cc");
	div.appendChild(para1);