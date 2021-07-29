(function(window) {
    function Promise(executor){
        this.status = 'pending'
        this.data = undefined
        this.callbacks = []

        function resolve(value){
            // this 指向？
            if(this.status!=='pending'){
                return
            }

            this.status = 'resolved'
            this.data = value
            if(this.callbacks.length>0){
                setTimeout(()=>{
                    this.callbacks.forEach(cb=>{
                        cb.onResolved(value)
                    })
                })
            }
        }

        function reject(reason){
            if(this.status!=='pending'){
                return
            }

            this.status = 'rejected'
            this.data = reason
            if(this.callbacks.length>0){
                setTimeout(()=>{
                    this.callbacks.forEach(cb=>{
                        cb.onRejected(reason)
                    })
                })
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }



    /**
     * Promise原型对象的then()
     * 指定成功和失败的回调函数
     * 返回一个新的promise对象
     */
    Promise.prototype.then = function(onResolved,onRejected){
        this.callbacks.push({
            onResolved,
            onRejected
        })
    }
})()