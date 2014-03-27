class PagesController < ApplicationController
  def home
  	if signed_in?
  		redirect_to(:controller => 'songs', :action => 'index') and return
  	end
  	@user = User.new
  end
end
