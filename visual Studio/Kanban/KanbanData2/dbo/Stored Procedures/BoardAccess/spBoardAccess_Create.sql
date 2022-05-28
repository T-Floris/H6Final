CREATE PROCEDURE [dbo].[spBoardAccess_Create]
	@Name NVARCHAR(50),
	@Description NVARCHAR(250)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO 
		[dbo].[BoardAccess]
		(
			[Id],
			[Name],
			[Description]
		)
	VALUES
		(
			DEFAULT,
			@Name,
			@Description
		)
END
