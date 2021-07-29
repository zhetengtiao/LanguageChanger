//Powered by Zhetengtiao
//这个函数的代码不是我原创的，只是偶然看见然后压箱底了，忘记了作者而已
//欢迎原作者联系我
function decode(){
    var charset=document.getElementById("qqid").value;
    var s=document.getElementById("text").value;
    const size = charset.length;
    const count = Math.ceil(8 / Math.log2(size));
    const arr = Array.from(s, c => charset.indexOf(c));
    const length = Math.trunc(arr.length / count);
    const data = new Uint8Array(length);
    for (let k = 0; k < length; k++){
        for (let i = count; i--;)
            data[k] = data[k] * size + arr[k * count + i];
    }
    var text=new TextDecoder;
    document.getElementById("returndata").innerText=text.decode(data);
}
function encode(){
    var charset=document.getElementById("qqid").value;
    var s=document.getElementById("text").value;
    const size = charset.length;
    const count = Math.ceil(8 / Math.log2(size));
    const data = new TextEncoder().encode(s);
    const arr = [];
    for (let c of data)
        for (let i = 0; i < count; i++) {
            const index = c % size;
            arr.push(index);
            c = (c - index) / size;
        }
    document.getElementById("returndata").innerText=arr.map(x => charset[x]).join("");
}