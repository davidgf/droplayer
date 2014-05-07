class PasswordsController < Clearance::PasswordsController
    def deliver_email(user)
        puts user
        ResetPasswordWorker.perform_async user.id
    end
end