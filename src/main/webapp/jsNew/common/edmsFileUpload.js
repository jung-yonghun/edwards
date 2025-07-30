var count = 0;
var extraObj = $("#edmsFileUploader").uploadFile({
    url						: "../apis/edms/uploadEdmsFileNew",
    fileName				: "myfile",
    autoSubmit				: true,
    multiple				: true,
    dragDrop				: true,
    dragdropWidth			: 368,
    statusBarWidth			: 250,
    maxFileSize				: 30000 * 1024,
    showAbort				: false,
    showDone				: false,
    showDelete				: false,
    showError				: false,
    showStatusAfterSuccess	: false,
    showStatusAfterError	: false,
    allowedTypes			: _defaultFileAllowExtensions,
    returnType				: "json",
    customProgressBar		: function(obj, s){
        this.statusbar 		= $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
        this.filename 		= $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
        this.progressDiv 	= $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
        this.progressbar 	= $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
        this.abort 			= $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
        this.cancel 		= $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
        this.done 			= $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
        this.download 		= $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
        this.del 			= $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

        this.abort.addClass("custom-red");
        this.done.addClass("custom-green");
        this.download.addClass("custom-green");
        this.cancel.addClass("custom-red");
        this.del.addClass("custom-red");
        if (count++ % 2 == 0)
            this.statusbar.addClass("even");
        else
            this.statusbar.addClass("odd");
        return this;
    },
    dynamicFormData: function(){
    	if($("#fileForm #EdmsParentGbn").val() == ""){
            alert("왼쪽 리스트를 선택하세요.");
            return;
        }else{
            if($("#fileForm #CommonGbn").val() == "B" && $("#fileForm #EdmsSingoNo").val() == ""){
                alert("신고번호가 부여되지 않았습니다. 공통문서로 분류해주세요.");
                return;
            }else if($("#fileForm #CommonGbn").val() == "A" && $("#fileForm #EdmsSingoNo").val() != ""){
            	if ($("#fileForm #CommonGbn").val() == "A" && $("#fileForm #EdmsNo").val() == ""){
            		alert("B/L(Inv) NO가 부여되지 않았습니다. 신고번호별 개별문서로 분류해주세요.");
                    return;
            	}
        		progress.show();
        		var data = $("#fileForm").serializeObject();
        		data["CommonYn"] = "Y";
                return data;
            }else{
            	progress.show();
            	var data = $("#fileForm").serializeObject();
            	data["CommonYn"] = "N";
                return data;
            }
        }
    },
    onSuccess: function(files, data, xhr, pd){
    	fn_fileListAction($("#fileForm #EdmsParentGbn").val(),$("#fileForm #EdmsMKey").val(),$("#fileForm #EdmsNo").val(),$("#fileForm #EdmsSingoNo").val());
    }
});