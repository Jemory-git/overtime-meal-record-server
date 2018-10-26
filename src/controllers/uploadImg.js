let uploadImg = async (ctx, next) => {
    console.log(ctx.request.body);

    ctx.response.body = ctx.request.body;
}

module.exports = {
    'POST /uploadImg': uploadImg
}