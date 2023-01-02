# javac Output.java 2> error.txt

# if [ -s error.txt ]
#     then
#         java Output 1> ans.txt
#         rm -f Output.class
        
# fi

# javac Output.java 2> ans.txt

# if [ -s ans.txt ]
#     then
#         java Output 1> ans.txt
#         rm -f Output.class
# fi


javac Output.java 2>error.txt
java Output 1>compiled.txt
rm -r Output.class

cat error.txt compiled.txt > ans.txt