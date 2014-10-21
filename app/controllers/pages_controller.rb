class PagesController < ApplicationController
  before_filter :authorize, only: :feedback
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

  def feedback
    @suggestion = Suggestion.new(suggestion_params)
    @suggestion.user = current_user
    if @suggestion.save
      flash[:suggestion] = "Message sent"
      redirect_to root_path
    end
  end

private

    # Never trust parameters from the scary internet, only allow the white list through.
    def suggestion_params
      params.require(:suggestion).permit(:message, :subject)
    end
end
