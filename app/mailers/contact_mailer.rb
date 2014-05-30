class ContactMailer < ActionMailer::Base
  
  def contact_email(message)
    @message = message
    mail(:from => @message.email, :to => APP_CONFIG['mail_sender'],
        :subject => @message.subject )
  end
end