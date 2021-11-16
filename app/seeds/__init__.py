from flask.cli import AppGroup
from .users import seed_users, undo_users
from .dogs import seed_dogs, undo_dogs
from .images import seed_images, undo_images
from .walks import seed_walks, undo_walks

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_dogs()
    seed_images()
    seed_walks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_walks()
    undo_images()
    undo_dogs()
    undo_users()

    # Add other undo functions here
