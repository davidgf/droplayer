require 'celluloid'
require 'sidekiq'
require 'sidekiq/actor'
require 'sidekiq/util'
require 'sidekiq/fetch'

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