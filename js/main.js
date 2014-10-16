//fungsi untuk fadeout & fadein element yang kita pilih
function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0)
        {
            el.style.display = "none";
        } else
        {
            requestAnimationFrame(fade);
        }
    })();
}

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 0.8))
        {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

var base_url = '//www.facebook.com/plugins/likebox.php?href=';
var page_url = 'http://www.facebook.com/ngide.net';
var other = '&colorscheme=light&show_faces=true&border_color=#fff&stream=false&header=false';

//check apakah cookie likebox sudah ada
var status = jsCookies.check('likebox_cookie'); 
if(status=='false')
{
    //jika tidak ada, show pop up  dan set cookie
    var expire = 1; //dalam hari (day)
    jsCookies.set('likebox_cookie', window.location, expire);

    var iframe = document.getElementById('likebox_iframe');
    iframe.src = base_url+page_url+other;
    iframe.onload = function () {
        var div = document.getElementById('likebox');
        fadeIn(div);
        document.getElementById("likebox_btn").onclick = function () {
            fadeOut(div);
            return false;
        };
    }
}

document.getElementById("delete_cookie").onclick = function () {
    jsCookies.delete('likebox_cookie');
    window.location.reload();
    return false;
};