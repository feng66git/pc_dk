$(function(){
	var trphone = /^1[3,4,5,6,7,8,9]\d{9}$/;
	$('body').on('mouseenter','.form .box',function(){
		$(this).find('ul').show();
	}).on('mouseleave','.form .box',function(){
		$(this).find('ul').hide();
	}).on('click','.form ul li',function(){
		var me = $(this);
		var val = me.html();
		console.log(me.attr('type'))
		if(me.attr('type') == 'other'){
			me.parent().hide().prev().attr('readonly',false).val('').focus();
		}else{
			me.parent().hide().prev().val(val).attr('readonly',true);
		}
	}).on('click','.count ul li',function(){
		$(this).addClass('on').siblings().removeClass('on');
		var parent_name = $(this).parent().parent()[0].className;
		var val_num = $(this).attr('value');
		if(parent_name == 'money'){
			if(val_num>0){
				$('.money input').attr('readonly',true).val(val_num)
			}else{
				$('.money input').attr('readonly',false).val('').focus()
			}
		}else{
			$('.computer').attr('date',val_num)
		}
	}).on('click','.computer',function(){
		var $input_num = $('.money input');
		var money_num = parseInt($input_num.val()) || 20000;
		var date = parseInt($(this).attr('date'));
		$input_num.val(money_num).attr('readonly',true);
		var result = (money_num*1.0527/date).toFixed(2);
		$('.result span').html(result);
	}).on('click','._top',function(){
		$('html,body').animate({'scrollTop':0},300)
	}).on('click','.submit',function(){
		var $me = $(this).parent();
		var status = $me.find('.status input').val();
		var price = $me.find('.price input').val();
		var username = $me.find('.username input').val();
		var phone = $me.find('.phone input').val();
		var code = $me.find('.ph_code input').val();
		if(price == ''){
			remin('请输入金额');
			return;
		}else if(username == ''){
			remin('请输入您的姓名');
			return;
		}else if(!trphone.test(phone)){
			remin('请输入正确的手机号码');
			return;
		}else if(code == ''){
			remin('请输入验证码');
			return;
		}else{
			alert(status+'-'+price+'-'+username+'-'+phone)
		}
	}).on('click','.send_code',function(){
		var t = 59;
		var _this = $(this);
		var phone = _this.parents('.form').find('.phone input').val();
		if(!trphone.test(phone)){
			remin('请输入正确的手机号码');
			return;
		}else{
			_this.attr('disabled',true);
      		_this.html('59s后重发');
      		var timer = setInterval(function(){
        		t--;
        		if(t<10){
          			str = '0'+t+'s后重发';
        		}else{
          			str = t+'s后重发';
        		}
        		if(t<1){
          			t = 59;
          			str = '获取验证码';
          			clearInterval(timer)
          			_this.attr('disabled',false)
        		}
        		_this.html(str)
      		},1000)
		}
	})
	$(window).scroll(function(){
		var srcoll_top = $(this).scrollTop();
		if(srcoll_top>200){
			$('.land').fadeIn()
		}else{
			$('.land').fadeOut()
		}
	})
	function remin(e){
		var remin_txt = '<div id="_remin" style="display:none">'+e+'</div>';
		$('body').append(remin_txt).stop();
		$('#_remin').fadeIn();
		setTimeout(function(){
			$('#_remin').fadeOut().remove();
		},3000)
	}
})