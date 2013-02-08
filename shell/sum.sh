#! /bin/bash
result=0;
for (( i = ${1}; i <= ${2}; i++ )); do
	let result=$result+$i
done
echo $result