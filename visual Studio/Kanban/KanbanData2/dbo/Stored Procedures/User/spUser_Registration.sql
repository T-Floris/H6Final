CREATE PROCEDURE [dbo].[spUser_Registration]
	@Id UNIQUEIDENTIFIER,
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@EmailAddress nvarchar(256),
	@UserName nvarchar(256),
	@Avatar nvarchar(50),
	@CreatedDate datetime
AS
BEGIN
	SET NOCOUNT ON

	INSERT INTO [dbo].[User] 
		(
			[Id],
			[FirstName],
			[LastName],
			[EmailAddress],
			[UserName],
			[Avatar],
			[CreatedDate]
		)
	VALUES 
		(
			@Id,
			@FirstName, 
			@LastName, 
			@EmailAddress, 
			@UserName,
			@Avatar,
			@CreatedDate
		)
end