#!/bin/bash
for (( i = 0; i < 100; i++ )); do
	./get.sh $i
	echo $i"_启动"
done