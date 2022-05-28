CREATE PROCEDURE [dbo].[spBoardAccess_Update]
	@Id UNIQUEIDENTIFIER,
	@Name NVARCHAR(50),
	@Description NVARCHAR(250)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE 
		[BoardAccess]
	SET 
		[Name] = @Name,
		[Description] = @Description

	WHERE 
		[BoardAccess].[Id] = @Id

END


