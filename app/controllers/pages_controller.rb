class PagesController < ApplicationController
  def home
    if signed_in?
        redirect_to(:controller => 'songs', :action => 'index') and return
    end
    @user = User.new
    @message = Message.new
  end
  
  def mail
    @message = Message.new(params[:message])
    
    respond_to do |format|
      if @message.valid?
        begin
          mail = ContactMailer.contact_email(@message)
          mail.deliver
          format.html { redirect_to root_path, notice: 'Mail sent' }
        rescue
          format.html { redirect_to root_path, notice: 'We couldn\'t deliver the message. Please, try again later.' }
        end
      else
        format.html { redirect_to root_path }
      end
    end
  end
end
