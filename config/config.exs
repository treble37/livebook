import Config

# Configures the endpoint
config :livebook, LivebookWeb.Endpoint,
  url: [host: "localhost"],
  pubsub_server: Livebook.PubSub,
  live_view: [signing_salt: "livebook"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Add mime type to upload notebooks with `Phoenix.LiveView.Upload`
config :mime, :types, %{
  "text/plain" => ["livemd"]
}

config :livebook,
  app_service_name: nil,
  app_service_url: nil,
  authentication_mode: :token,
  feature_flags: [],
  force_ssl_host: nil,
  learn_notebooks: [],
  plugs: [],
  shutdown_callback: nil,
  storage: Livebook.Storage.Ets,
  update_instructions_url: nil,
  within_iframe: false

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
