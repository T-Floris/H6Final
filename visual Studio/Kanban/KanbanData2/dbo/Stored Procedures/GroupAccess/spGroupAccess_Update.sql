CREATE PROCEDURE [dbo].[spGroupAccess_Update]
	@Id UNIQUEIDENTIFIER,
	@Name NVARCHAR(50),
	@Description NVARCHAR(250)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE 
		[GroupAccess]
	SET 
		[Name] = @Name,
		[Description] = @Description

	WHERE 
		[GroupAccess].[Id] = @Id

END
