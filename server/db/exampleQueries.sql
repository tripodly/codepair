# In our example queries the current user's id is 25.

# Selects relationships in pendings where current user is the toUser(recipient):
SELECT * FROM `pendings` WHERE `toUser` = 25

# Selects any relationship in passes where current user is the fromUser(initiator) or toUser(recipient): 
SELECT * FROM `passes` WHERE `toUser` = 25 OR `fromUser` = 25;

# Selects all relationships in matches where current user is the fromUser(initiator) or toUser(recipient):
SELECT * FROM `matches` WHERE `toUser` = 25 OR `fromUser` = 25;

# Deletes relationship from pending and turns it into a relationship in matches,
# in this case the user_id of the user shown in the current card is 14
DELETE FROM `pendings` WHERE `pendings`.`fromUser` = 14 AND `pendings`.`toUser` = 25;
INSERT INTO `matches` (`fromUser`, `toUser`) VALUES (25, 14);