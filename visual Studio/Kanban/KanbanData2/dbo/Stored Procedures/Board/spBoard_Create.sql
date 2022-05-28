CREATE PROCEDURE [dbo].[spBoard_Create]
	@UserId UNIQUEIDENTIFIER,
	@Name nvarchar(50)

AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[Board]
	(
		[Id],
		[UserId],
		[Name]
	)
	VALUES
	(
		DEFAULT,
		@UserId,
		@Name
	)
END