class ResetPasswordWorker
    include Sidekiq::Worker
  
    def perform(user_id)
        user = User.find(user_id)
        ClearanceMailer.change_password(user).deliver
    end

end