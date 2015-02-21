class DemoController < ApplicationController

    def show
        @demo_user = User.where(email: "info@streamr.es").first
        cookies.permanent[:remember_token] = @demo_user.remember_token
        redirect_to(:controller => 'songs', :action => 'index')
    end

end
