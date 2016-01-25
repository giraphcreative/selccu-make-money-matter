!function(a,b,c,d){function e(a){return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")}a.extend(a.fn,{accrue:function(b){return b=a.extend({calculationMethod:g},a.fn.accrue.options,b),this.each(function(){var c=a(this);c.find(".form").length||c.append('<div class="form"></div>');f(c,b,"amount"),f(c,b,"rate"),f(c,b,"term");if("compare"==b.mode){f(c,b,"rate_compare")}var d;".results"===b.response_output_div?(0===c.find(".results").length&&c.append('<div class="results"></div>'),d=c.find(".results")):d=a(b.response_output_div);var e;switch(b.mode){case"basic":e=g;break;case"compare":e=h;break;case"amortization":e=i}e(c,b,d),"button"==b.operation?(0===c.find("button").length&&0===c.find("input[type=submit]").length&&0===c.find("input[type=image]").length&&c.find(".form").append('<button class="accrue-calculate">'+b.button_label+"</button>"),c.find("button, input[type=submit], input[type=image]").each(function(){a(this).click(function(a){a.preventDefault(),e(c,b,d)})})):c.find("input, select").each(function(){a(this).bind("keyup change",function(){e(c,b,d)})}),c.find("form").each(function(){a(this).submit(function(a){a.preventDefault(),e(c,b,d)})})})}}),a.fn.accrue.options={mode:"basic",operation:"keyup",default_values:{amount:"$7,500",rate:"7%",rate_compare:"1.49%",term:"36m"},field_titles:{amount:"Loan Amount",rate:"Rate (APR)",rate_compare:"Comparison Rate",term:"Term"},button_label:"Calculate",field_comments:{amount:"",rate:"",rate_compare:"",term:"Format: 12m, 36m, 3y, 7y"},response_output_div:".results",response_basic:"<p><strong>Monthly Payment:</strong><br />$%payment_amount%</p><p><strong>Number of Payments:</strong><br />%num_payments%</p><p><strong>Total Payments:</strong><br />$%total_payments%</p><p><strong>Total Interest:</strong><br />$%total_interest%</p>",response_compare:'<p class="total-savings">Save $%savings% in interest!</p>',error_text:'<p class="error">Please fill in all fields.</p>',callback:function(a,b){}};var f=function(a,b,c){var d;return a.find(".accrue-"+c).length?d=a.find(".accrue-"+c):a.find("."+c).length?d=a.find("."+c):a.find("input[name~="+c+"]").length?a.find("input[name~="+c+"]"):d="","string"!=typeof d?d.val():"term_compare"==c?!1:(a.find(".form").append('<div class="accrue-field-'+c+'"><p><label>'+b.field_titles[c]+':</label><input type="text" class="'+c+'" value="'+b.default_values[c]+'" />'+(b.field_comments[c].length>0?"<small>"+b.field_comments[c]+"</small>":"")+"</p></div>"),a.find("."+c).val())},g=function(b,c,d){var g=a.loanInfo({amount:f(b,c,"amount"),rate:f(b,c,"rate"),term:f(b,c,"term")});if(0!==g){var h=c.response_basic.replace("%payment_amount%",e(g.payment_amount_formatted)).replace("%num_payments%",g.num_payments).replace("%total_payments%",e(g.total_payments_formatted)).replace("%total_interest%",e(g.total_interest_formatted));d.html(h)}else d.html(c.error_text);c.callback(b,g)},h=function(b,c,d){var g=f(b,c,"term_compare");"boolean"==typeof g&&(g=f(b,c,"term"));var h=a.loanInfo({amount:f(b,c,"amount"),rate:f(b,c,"rate"),term:f(b,c,"term")}),i=a.loanInfo({amount:f(b,c,"amount"),rate:f(b,c,"rate_compare"),term:g}),j={loan_1:h,loan_2:i};if(0!==h&&0!==i){h.total_interest-i.total_interest>0?j.savings=h.total_interest-i.total_interest:j.savings=0;var k=c.response_compare.replace("%savings%",e(j.savings.toFixed(2))).replace("%loan_1_payment_amount%",e(i.payment_amount_formatted)).replace("%loan_1_num_payments%",i.num_payments).replace("%loan_1_total_payments%",i.total_payments_formatted).replace("%loan_1_total_interest%",e(i.total_interest_formatted)).replace("%loan_2_payment_amount%",e(h.payment_amount_formatted)).replace("%loan_2_num_payments%",h.num_payments).replace("%loan_2_total_payments%",h.total_payments_formatted).replace("%loan_2_total_interest%",e(h.total_interest_formatted));d.html(k)}else d.html(c.error_text);c.callback(b,j)},i=function(b,c,d){var g=a.loanInfo({amount:f(b,c,"amount"),rate:f(b,c,"rate"),term:f(b,c,"term")});if(0!==g){for(var h='<table class="accrue-amortization"><thead><tr><th class="accrue-payment-number">#</th><th class="accrue-payment-amount">Payment Amt.</th><th class="accrue-total-interest">Total Interest</th><th class="accrue-total-payments">Total Payments</th><th class="accrue-balance">Balance</th></tr></thead><tbody>',i=g.payment_amount-g.original_amount/g.num_payments,j=g.payment_amount-i,k=0,l=0,m=parseInt(g.original_amount,10),n=0;n<g.num_payments;n++){k+=i,l+=g.payment_amount,m-=j;var o="td";n==g.num_payments-1&&(o="th"),h=h+"<tr><"+o+' class="accrue-payment-number">'+(n+1)+"</"+o+"><"+o+' class="accrue-payment-amount">$'+e(g.payment_amount_formatted)+"</"+o+"><"+o+' class="accrue-total-interest">$'+e(k.toFixed(2))+"</"+o+"><"+o+' class="accrue-total-payments">$'+e(l.toFixed(2))+"</"+o+"><"+o+' class="accrue-balance">$'+e(m.toFixed(2))+"</"+o+"></tr>"}h+="</tbody></table>",d.html(h)}else d.html(c.error_text);c.callback(b,g)};a.loanInfo=function(a){var b=("undefined"!=typeof a.amount?a.amount:0).toString().replace(/[^\d.]/gi,""),c=("undefined"!=typeof a.rate?a.rate:0).toString().replace(/[^\d.]/gi,""),d="undefined"!=typeof a.term?a.term:0;d=d.match("y")?12*parseInt(d.replace(/[^\d.]/gi,""),10):parseInt(d.replace(/[^\d.]/gi,""),10);var e=c/100/12,f=Math.pow(1+e,d),g=b*f*e/(f-1);return b*c*d>0?{original_amount:b,payment_amount:g,payment_amount_formatted:g.toFixed(2),num_payments:d,total_payments:g*d,total_payments_formatted:(g*d).toFixed(2),total_interest:g*d-b,total_interest_formatted:(g*d-b).toFixed(2)}:0},a.loanAmount=function(a){var b=("undefined"!=typeof a.payment?a.payment:0).toString().replace(/[^\d.]/gi,""),c=("undefined"!=typeof a.rate?a.rate:0).toString().replace(/[^\d.]/gi,""),d="undefined"!=typeof a.term?a.term:0;d=d.match("y")?12*parseInt(d.replace(/[^\d.]/gi,""),10):parseInt(d.replace(/[^\d.]/gi,""),10);var e=c/100/12,f=c/100,g=b*(1-Math.pow(1+e,-1*d))*(12/f);return g>0?{principal_amount:g,principal_amount_formatted:(1*g).toFixed(2),payment_amount:b,payment_amount_formatted:(1*b).toFixed(2),num_payments:d,total_payments:b*d,total_payments_formatted:(b*d).toFixed(2),total_interest:b*d-g,total_interest_formatted:(b*d-g).toFixed(2)}:0}}(jQuery,window,document),function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-38315794-26","auto"),ga("send","pageview"),$(function(){var a=function(){var a=parseFloat("undefined"!=typeof $(".result.home").html()?$(".result.home").html().replace("$","").replace(",",""):0)+parseFloat("undefined"!=typeof $(".result.loan-auto").html()?$(".result.loan-auto").html().replace("$","").replace(",",""):0)+parseFloat("undefined"!=typeof $(".result.loan-personal").html()?$(".result.loan-personal").html().replace("$","").replace(",",""):0);a>0&&$(".result.total").html(""+a.toFixed(2))};$(".calculator.home").accrue({mode:"compare",response_output_div:".result.home",response_compare:"%savings%",error_text:"0",callback:function(b,c){0!==c&&a()}}),$(".calculator.loan-auto").accrue({mode:"compare",response_output_div:".result.loan-auto",response_compare:"%savings%",error_text:"0",callback:function(b,c){0!==c&&a()}}),$(".calculator.loan-personal").accrue({mode:"compare",response_output_div:".result.loan-personal",response_compare:"%savings%",error_text:"0",callback:function(b,c){0!==c&&a()}}),$(".numbers-only").keyup(function(){var a=$(this).val().replace(/[^0-9.]/g,"");$(this).val(a)}),$(".calculate").click(function(){$(".tool").slideUp("slow"),$(".results").slideDown("slow"),$("html,body").animate({scrollTop:$("header img").height()},800)}),$(".go-back").click(function(){$(".tool").slideDown("slow"),$(".results").slideUp("slow")})});