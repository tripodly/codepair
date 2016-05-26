# In our example queries the current user's id is 25.

# Selects relationships in pendings where current user is the toUser(recipient):
SELECT * FROM `pendings` WHERE `toUser` = 25

# Selects any relationship in passes where current user is the fromUser(initiator) or toUser(recipient): 
SELECT * FROM `passes` WHERE `toUser` = 25 OR `fromUser` = 25;

# Selects all relationships in matches where current user is the fromUser(initiator) or toUser(recipient):
SELECT * FROM `matches` WHERE `toUser` = 25 OR `fromUser` = 25;