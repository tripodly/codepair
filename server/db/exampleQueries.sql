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


# TO GET MATCHES (placed into matches array):
## Selects all user records who've matched with currentUser of id 14:
SELECT U.* FROM `users` AS U WHERE U.id IN (
	SELECT M.`fromUser` FROM `matches` AS M WHERE `toUser` = 14 
    UNION
	SELECT M.`toUser` FROM `matches` AS M WHERE `fromUser` = 14);

# TO GET PENDINGS (placed into initiated array):
## Selects all user records who've swiped right on currentUser of id 20:
SELECT U.* FROM `users` AS U WHERE U.id IN (
	SELECT P.`fromUser` FROM `pendings` AS P WHERE `toUser` = 20);

# TO GET OTHERS (placed into uninitiated array):
## Selects records of all users who have not liked nor disliked the current user and who the current user has not liked or disliked:
SELECT U.* FROM `users` AS U WHERE U.id NOT IN (
  SELECT P.`fromUser` FROM `pendings` AS P WHERE `toUser` = 20
    UNION 
  SELECT M.`fromUser` FROM `matches` AS M WHERE `toUser` = 20 
    UNION
	SELECT M.`toUser` FROM `matches` AS M WHERE `fromUser` = 20
    UNION
  SELECT P.`fromUser` from `passes` AS P WHERE `toUser` = 20
    UNION
  SELECT P.`toUser` from `passes` AS P WHERE `fromUser` = 20
) AND u.id != 20;