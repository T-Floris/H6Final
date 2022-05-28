CREATE PROCEDURE [dbo].[spGroupAccess_Create]
	@Name NVARCHAR(50),
	@Description NVARCHAR(250)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TableId UNIQUEIDENTIFIER;

	DECLARE @GuidTable TABLE (
	ColGuid uniqueidentifier
	)
	INSERT INTO 
		[dbo].[GroupAccess]
		(
			[Id],
			[Name],
			[Description]
		)
	OUTPUT inserted.Id INTO @GuidTable
	VALUES
		(
			DEFAULT,
			@Name,
			@Description
		)

	SELECT @TableId = ColGuid FROM @GuidTable

	EXEC [dbo].[spGroupAccess_Get] @TableId

	--SELECT
	--	[GroupAccess].[Id],
	--	[GroupAccess].[Name],
	--	[GroupAccess].[Description]

	--FROM 
	--	[GroupAccess]
	--WHERE
	--	[GroupAccess].[Id] = @TableId
END
