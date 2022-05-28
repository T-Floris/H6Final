CREATE PROCEDURE [dbo].[spGroupAccess_GetAll]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT
		[GroupAccess].[Id],
		[GroupAccess].[Name],
		[GroupAccess].[Description]
	FROM
		[GroupAccess]
END
