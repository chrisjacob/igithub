# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_igithub_session',
  :secret      => 'ddb6e6756ad78de20e59fb579958efbea2c3fa95f705ac3fad553ffaa106deda3c67b82749985e01c8a456c0cc13a5f34cf81de84297e0b451250db71aeb820f'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
