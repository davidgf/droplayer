require 'celluloid'
require 'sidekiq'
require 'sidekiq/actor'
require 'sidekiq/util'
require 'sidekiq/fetch'
require 'sidekiq/web'

class DynamicFetch < Sidekiq::BasicFetch
  def queues_cmd
    queues = Sidekiq.redis { |conn| conn.smembers('queues') }
    queues.map! { |q| "queue:#{q}" }

    if queues.empty?
      return super
    else
      @queues = queues
    end

    # for supporting strictly_ordered_queues options
    @unique_queues = @queues.uniq
    super
  end
end

Sidekiq.options.merge!({
  fetch: DynamicFetch
})

Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
  [user, password] == [APP_CONFIG['sidekiq_user'], APP_CONFIG['sidekiq_pass']]
end