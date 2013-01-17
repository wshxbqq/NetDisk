(function  () {
	var FileManager=window.FileManager=function(root) {
		this.root=root;
	}

	FileManager.prototype.createDirectory = function(directoryName,success,fail) {

		var Directory = this.root;
		console.log(Directory);
		Directory.getDirectory(directoryName, {create: true, exclusive: true}, success||null, fail||null)
	};

	FileManager.prototype.createFile = function(fileName,success,fail) {

		var Directory = this.root;
        console.log(Directory);
		Directory.getFile(fileName, {create: true, exclusive: true}, success||null, fail||null);

	};


	FileManager.prototype.exist=function(fileName,callback){
        var Directory = this.root;
        var success=function() {
        	callback(true);
        };
        var fail=function() {
        	callback(false);
        }
		Directory.getFile(fileName, {create: false}, success, fail);
	}
	
	FileManager.prototype.writeFile = function(fileName,text,callBack) {
		var Directory = this.root;
		var success=function(fileEntity) {
			  console.log(fileEntity);
			 var win=function  (writer) {
   			 	writer.write(text);
   			 	callBack(text)
			 };
			 var fai=function  (evt) {
			 	console.log(error.code);
			 }
			fileEntity.createWriter(win, fai);
		}
		Directory.getFile(fileName, {}, success, null)
	};


	FileManager.prototype.readFile = function(fileName,callBack) {
		var Directory = this.root;
		console.log(Directory);
		var success=function(fileEntity) {
				var win=function() {
			    var reader = new FileReader();
			        reader.onloadend = function(evt) {
				        console.log("read success");
				        var result=evt.target.result;
				        callBack(result);
 			   		};
 			   		reader.readAsText(fileEntity);
				};

				fileEntity.file(win, null);
		}

		Directory.getFile(fileName, {}, success, null)
	};




	FileManager.getRootPath=function  (CallBack) {
		var onSuccess=function(fileSystem) {
			window.PhoneGapDocRoot=fileSystem.root;
			if(CallBack){
				CallBack(fileSystem.root);
			}
		}
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, null); 
	}
})()

