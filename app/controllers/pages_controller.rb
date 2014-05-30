class PagesController < ApplicationController
  def home
    if signed_in?
        redirect_to(:controller => 'songs', :action => 'index') and return
    end
    @user = User.new
    @message = @message || Message.new
  end
  
  def mail
    @message = Message.new(params[:message])
    
    respond_to do |format|
      if @message.valid?
        begin
          mail = ContactMailer.contact_email(@message)
          mail.deliver
          flash[:mail_sent] = "The email was sent"
          format.html { redirect_to root_path }
        rescue
          flash[:mail_error] = "We couldn\'t deliver the message. Please, try again later"
          format.html { redirect_to root_path }
        end
      else
        flash[:mail_error] = "Please fill all the required fields"
        format.html { render action: 'home'  }
      end
    end
  end
end
