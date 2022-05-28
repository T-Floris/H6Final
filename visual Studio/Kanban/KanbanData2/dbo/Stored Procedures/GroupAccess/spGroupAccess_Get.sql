CREATE PROCEDURE [dbo].[spGroupAccess_Get]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

		SELECT
		[GroupAccess].[Id],
		[GroupAccess].[Name],
		[GroupAccess].[Description]

	FROM 
		[GroupAccess]
	WHERE
		[GroupAccess].[Id] = @Id
END