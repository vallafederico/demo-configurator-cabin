vec3 randVec3(int i) {
    float s = float(i); // seed
	return vec3( fract( sin(s*6793.6)*2986.3 )*2.0-1.0
               , fract( sin(s*9365.3)*9374.5 )*2.0-1.0
               , fract( sin(s*2347.2)*8264.7 )*2.0-1.0
               );
}

vec3 blurCube(float r, samplerCube t, vec3 v, int maxS) {
    r = fract(r); // limit radius to [0..1]
    vec3 c = textureCube(t, v).rgb;
    //.----------------
    //| RANDOM SAMPLING - look up texture maxS^2 times in a radius r around v
    vec3 rv;
    float w, tw = 0.0;
    for (int i=0; i < 100; i++) {
        rv = v + randVec3(i) * r;
        tw = length(rv); // account for sampling distance
    	c += textureCube(t, rv).rgb * tw;
        w += tw * .85; // values less than 1 like 0.85 fake bloom of bright areas
        			
    }
	return c/(w+1.0); // divide result by accumulated weight w
}