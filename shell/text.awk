BEGIN{
	FS="\n"
	RS=""
}
{
	print $1
}
END{
	print NR
}