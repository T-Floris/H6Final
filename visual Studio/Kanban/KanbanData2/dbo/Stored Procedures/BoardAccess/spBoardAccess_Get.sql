CREATE PROCEDURE [dbo].[spBoardAccess_Get]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT
		[BoardAccess].[Id],
		[BoardAccess].[Name],
		[BoardAccess].[Description]
	FROM
		[BoardAccess]
END
